---
id: ui-components
title: 'UI Components'
description: 'Reuse the React components the default Verdaccio theme is built from.'
---

Building a [theme plugin](plugin-theme.md) from scratch is a lot of work. `@verdaccio/ui-components` publishes the pieces the default theme is built from, as reusable React components you can plug together.

To install install the dependency in a local project.

:::caution

The UI components are in _experimental_ mode, currently used to build the main user interface [`@verdaccio/ui-theme`](https://github.com/verdaccio/verdaccio/tree/master/packages/plugins/ui-theme), If you are willing to use it **feedback is welcome**.

:::

```bash
npm i -D @verdaccio/ui-components@next-9
```

:::caution `next-9` whichever line you target — not `latest`, not `6-next`, not `next-7`
Unlike the rest of the packages, the UI is the **same on both lines**: `verdaccio@6.10.4`
and `verdaccio@7.0.0-next-7.28` both ship `@verdaccio/ui-theme@9.0.0-next-9.31`, and that
theme is built against `@verdaccio/ui-components@5.0.0-next-9.22` — the `next-9` tag. So
`next-9` is the right tag for a theme targeting 6.x as well.

The alternatives all point somewhere stale: `@verdaccio/ui-components@latest` is `1.0.0`,
`6-next` is `2.0.0-6-next.10` and `next-7` is `3.0.0-next-7.9`. None of them matches the UI
any supported Verdaccio actually runs.

This is the one place where the tag differs from the rule for other packages, where 6.x
takes `latest` — see [which version to depend on](dev-plugins.md#core-version).
:::

There is no component gallery site; the default theme
[`@verdaccio/ui-theme`](https://github.com/verdaccio/verdaccio/tree/master/packages/plugins/ui-theme)
is the reference consumer, and the
[source](https://github.com/verdaccio/verdaccio/tree/master/packages/ui-components) lists
everything that is exported.

## How to use it {#how-to-useit}

There are a set of tools can be used in order to build your own user interface:

- `components`: Independent components to use to build different layouts, all components are based on [MUI (Material UI)](https://mui.com/).
- `providers`: Providers are useful components that uses the React [`Context`](https://reactjs.org/docs/context.html), for instance, the `VersionProvider` connects the Redux store with independent components. The `AppConfigurationProvider` is able to read the
- `store`: The Redux store powered by [`Rematch`](https://rematchjs.org), could be used with the global object `__VERDACCIO_BASENAME_UI_OPTIONS` that verdaccio uses to provide the UI configuration.
- `theme`: The `ThemeProvider` is an abstraction of the _material-ui_ theme provider.
- `sections`: A group of components to setup quickly sections of the application, like the sidebar, header of footer.
- `layouts`: Are the combination of one or more sections ready to use.
- `hooks`: A collection of useful React hooks.

The combination of them depend of your needs, it could be used to inject custom components, routes or addition of new pages or components.

## Requirements {#requirements}

The list of mandatory libraries need it to using with ui components.

- React >17
- Material UI >5.x
- Redux >4.x
- Emotion >11
- i18next >20.x
- TypeScript is optional

## Examples {#examples}

```jsx
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import {
  Home,
  store,
  Loading,
  NotFound,
  Route as Routes,
  TranslatorProvider,
  VersionProvider,
  loadable,
} from '@verdaccio/ui-components';

// to enable webpack code splitting
const VersionPage = loadable(() => import('../pages/Version'));

const App: React.FC = () => {
  // configuration from config.yaml
  const { configOptions } = useConfig();
  const listLanguages = [{lng: 'en-US', icon: <someSVGIcon>, menuKey: 'lng.english'}];
  return (
      <Provider store={store}>
        <AppConfigurationProvider>
          <ThemeProvider>
            <TranslatorProvider i18n={i18n} listLanguages={listLanguages} onMount={() => {}}>
              <Suspense fallback={<Loading />}>
                <Router history={history}>
                  <Header HeaderInfoDialog={CustomInfoDialog} />
                    <Switch>
                      <Route exact={true} path={Routes.ROOT}>
                        <Home />
                      </Route>
                      <Route exact={true} path={Routes.SCOPE_PACKAGE}>
                        <VersionProvider>
                          <VersionPage />
                        </VersionProvider>
                      </Route>
                    </Switch>
                </Router>
                {configOptions.showFooter && <Footer />}
              </Suspense>
            </TranslatorProvider>
          </ThemeProvider>
        </AppConfigurationProvider>
      </Provider>
  );
};
```
