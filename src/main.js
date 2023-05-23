import 'uno.css';
// import './main.css';
// import { buildHiringEvents } from './js/hiring-events.js';
// import { buildAgencySelect } from './js/agency-select.js';

import './js/inert-polyfill.js';
import './js/components/NYCForm.js';
import './js/components/NYCClearInputButton.js';
import './js/components/NYCReel.js';
import './js/components/NYCEventCard.js';
import './js/components/NYCEventCardList.js';
import './js/components/NYCCsv.js';

const main = () => {
  try {
    // buildHiringEvents();
    // buildAgencySelect();
  } catch (e) {
    console.error(e);
  }
}

main();
