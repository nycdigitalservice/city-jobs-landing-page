import posthtml from 'posthtml';
import { PerformanceObserver, performance } from 'perf_hooks';

/**
 *
 * @param {Object} opts Options for the plugin
 * @param {Function[]} [opts.plugins] PostHTML plugins to use
 * @param {Function} [opts.posthtml] PostHTML instance to use
 * @param {Object} [opts.options] PostHTML options. Will always run in asynchronous mode
 * @return {Object} Vite plugin
 */
const posthtmlPlugin = (opts = {}) => {
  const { options, plugins, renderer } = Object.assign(
    {
      renderer: posthtml,
      options: {},
      plugins: [],
    },
    opts,
  );
  options.sync = false;

  // const observer = new PerformanceObserver((items) => {
  //   const entries = items.getEntries();
  //   const total = entries.find((i) => i.name === 'duration');
  //   if (total.duration > 250) {
  //     console.error(`PostHTML took ${Math.round(total.duration)}ms to run`);
  //   }

  //   performance.clearMarks();
  // });
  // observer.observe({ entryTypes: ['measure'] });

  return {
    name: 'posthtml',
    enforce: 'pre',

    transformIndexHtml: {
      enforce: 'pre',
      async transform(input) {
        // performance.mark('start');
        // console.log(input);
        const { html } = await renderer(plugins || []).process(input, options || {});
        // performance.measure('duration', 'start');
        // console.log(html);
        return html;
      }
    },
  };
};

export default posthtmlPlugin;
