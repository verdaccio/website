import { errorUtils, pluginUtils } from '@verdaccio/core';
import type { AllowAccess, PackageAccess, RemoteUser } from '@verdaccio/types';

/**
 * Options read from your plugin's key in `auth:` of `config.yaml`.
 *
 * ```yaml
 * auth:
 *   my-service:
 *     endpoint: https://accounts.example.com
 * ```
 *
 * Several auth plugins can be chained; the first one that resolves a request wins and the
 * rest are skipped.
 */
type CustomConfig = { endpoint?: string };

/**
 * Authentication plugins decide who a user is and what they may do.
 *
 * Unlike storage, this contract is still **callback based** — there is no promise variant.
 * Only `authenticate` is required; Verdaccio falls back to its own behaviour for every
 * other method you leave out.
 *
 * @see https://verdaccio.org/dev/plugin-auth
 */
export default class ServiceAuth
  extends pluginUtils.Plugin<CustomConfig>
  implements pluginUtils.Auth<CustomConfig>
{
  /**
   * Verify credentials. Called on every request that carries them.
   *
   * The second argument decides the outcome, and the three cases are easy to confuse:
   *
   * - `cb(null, ['group-a'])` — authenticated, with the groups the user belongs to.
   * - `cb(null, false)` — **wrong credentials**. Not an error; the request falls back to
   *   `$anonymous`, or to the next plugin in the chain.
   * - `cb(errorUtils.getInternalError('...'))` — the auth *service* failed. Use this only
   *   when you could not decide, never for a bad password.
   */
  public authenticate(user: string, password: string, cb: pluginUtils.AuthCallback): void {
    if (!password) {
      return cb(errorUtils.getUnauthorized('no credentials provided'));
    }

    if (user === 'known-user' && password === 'secret') {
      return cb(null, ['developers', 'publishers']);
    }

    return cb(null, false);
  }

  /**
   * Handle `npm adduser`. Optional: without it, registration falls back to Verdaccio.
   *
   * Answer `cb(null, true)` on success, or an error to refuse — `getConflict` is the usual
   * one when the account already exists or a quota is reached. Plugins backed by a directory
   * you do not own (LDAP, SSO) normally delegate to `authenticate` and refuse creation.
   */
  public adduser(user: string, password: string, cb: pluginUtils.AuthUserCallback): void {
    this.authenticate(user, password, (err, groups) => {
      if (err || !groups) {
        return cb(errorUtils.getConflict('registration is not allowed'));
      }
      return cb(null, true);
    });
  }

  /**
   * Handle `npm profile set password`. Optional.
   *
   * `getNotFound()` is the right answer when the user does not exist in your backend.
   */
  public changePassword(
    user: string,
    _password: string,
    _newPassword: string,
    cb: pluginUtils.AuthChangePasswordCallback
  ): void {
    if (user !== 'known-user') {
      return cb(errorUtils.getNotFound('user not found'));
    }
    return cb(null, true);
  }

  /**
   * Can this user read the package?
   *
   * `pkg.access` holds whatever the `packages:` block configured, including the role tokens
   * `$all`, `$anonymous` and `$authenticated`. If you answer `cb(null, false)` the client
   * gets a 404 rather than a 403, on purpose: an unauthorised read must not reveal that the
   * package exists.
   */
  public allow_access(
    user: RemoteUser,
    pkg: AllowAccess & PackageAccess,
    cb: pluginUtils.AccessCallback
  ): void {
    const allowed = (pkg.access ?? []).some((group) => user.groups.includes(group));
    return cb(null, allowed);
  }

  /** Can this user publish? Same shape as {@link allow_access}. */
  public allow_publish(
    user: RemoteUser,
    pkg: AllowAccess & PackageAccess,
    cb: pluginUtils.AuthAccessCallback
  ): void {
    const allowed = (pkg.publish ?? []).some((group) => user.groups.includes(group));
    return cb(null, allowed);
  }

  /**
   * Can this user unpublish?
   *
   * When a package has no `unpublish` entry the convention is to fall back to `publish`,
   * which is what the built-in plugin does.
   */
  public allow_unpublish(
    user: RemoteUser,
    pkg: AllowAccess & PackageAccess,
    cb: pluginUtils.AuthAccessCallback
  ): void {
    const rules = Array.isArray(pkg.unpublish) ? pkg.unpublish : pkg.publish;
    const allowed = (rules ?? []).some((group) => user.groups.includes(group));
    return cb(null, allowed);
  }
}
