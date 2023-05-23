// @unocss-include
export const buildHiringEvents = async () => {

  const getCsv = (url) => new Promise((resolve, reject) => window.Papa.parse(url, {
    header: true,
    download: true,
    complete: resolve,
    error: reject
  }));

  const hiringEl = document.getElementById('hiring-events-container');

  const strToDate = dateStr => {
    const dateStrClean = dateStr.includes('-') ? dateStr.replace(/-/g, '/') : dateStr;
    return new Date(dateStrClean);
  };

  const formatDate = date => {
    // Change dashes to slashes in date string to accommodate Safari
    const dateOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    // const dateStr = date.includes('-') ? date.replace(/-/g, '/') : date;
    const dateLong = date.toLocaleDateString('en-US', dateOptions);
    const [weekday, month, day] = dateLong.replace(/,/,'').split(' ');
    const formattedDate = `${weekday}<br>${month} ${day}`;
    return formattedDate;
  }

  const isDatePast = date => {
    const today = new Date();
    return today < date;
  }

  const buildEventEl = ({ Title, Department, Time, Location, Link, Date, formattedDate }) => `
  <article class="c-card flow" data-flow-space="s">
  <header class="c-card__header flex flex-col">
  <h3><a href="${Link}" class="no-underline" target="_blank">${Title}</a></h3>
  <time datetime="${Date}" class="order-first text-xs">${formattedDate}</time>
  </header>
  <div class="c-card__body flow" data-flow-space="s">
  <p>${Department}</p>
  <p>${Location}<br>${Time}</p>
  <a href="${Link}" target="_blank" class="c-card__cta !mt-0" tabindex="-1">
  <span class="underline me-3 sr-only">Event details and registration</span>
  <span class="c-card__cta__icon-wrapper">
  <i class="i-ri:arrow-right-line"></i>
  </span>
  </a>
  </div>
  </article>
  `;

  // Hiring Events
  if (!window.Papa) return;
  const csvRes = await getCsv('/assets/home/data/hiring-events.csv');
  const eventsData = csvRes.data;

  if (eventsData.length > 0) {
    const upcomingEvents = eventsData
          .map(event => {
            const dateTyped = strToDate(event.Date);
            return {
              ...event,
              dateTyped,
              formattedDate: formatDate(dateTyped)
            }
          }) // clean up the date string input, providing a Date() obj and formatted Date string
          .filter(({ dateTyped }) => isDatePast(dateTyped)) // filter out past dates

    if (upcomingEvents.length > 0){
      const eventsEls = upcomingEvents.map(buildEventEl).join('');

      hiringEl.innerHTML = eventsEls;
    }
  }
}
