// Lets you try the brand colour variants defined in src/css/_brand.scss: open any page with
// `?brand=red`, `?brand=green` or `?brand=default`. The choice is kept in localStorage.
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

if (ExecutionEnvironment.canUseDOM) {
  try {
    const requested = new URLSearchParams(window.location.search).get('brand');
    if (requested) {
      if (requested === 'default') {
        window.localStorage.removeItem('brand');
      } else {
        window.localStorage.setItem('brand', requested);
      }
    }
    const brand = window.localStorage.getItem('brand');
    if (brand) {
      document.documentElement.setAttribute('data-brand', brand);
    } else {
      document.documentElement.removeAttribute('data-brand');
    }
  } catch {
    // storage can be blocked; the default colours are used
  }
}
