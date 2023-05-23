import jobCategories from './js/constants/job-categories.ts';

const buildJobCategoryList = () => {
  const jobCategoryEl = document.getElementById('job-categories');
  const buildCategoryEl = ({ url, name, icon }) => `
  <li>
  <a href="${url}" class="button" data-variant="secondary" target="_blank">
  <span class="me-4 flex items-center"><i class="${icon} text-2xl"></i></span>
  <span class="flex-1">${name}</span>
  </a>
  </li>
`;

  // Job Categories
  jobCategoryEl.innerHTML = jobCategories.map(buildCategoryEl).join('');
}
