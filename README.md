Country list project done using: https://restcountries.com/v2/all?fields=name,region,area,flag API.

Done using React Hooks (useState - state, and useEffect - for loading data on page load) and Typescript:
- On page spinning element is displayed, while data is being fetched. Once data is fetched, spinning element is not shown.
- Fetched list contains 250 countries. There's 10 countries displayed per page using pagination.
- Countries have this information: flag, name, region, area size.
- Area size can be converted to miles (and vice versa) via a button.
- Using pagination numbers, prev & next buttons and keyboard left & right arrows, list can be changed to show other countries.
- List can be sorted by alphabet (A to Z, Z to A) via a button.
- List can be sorted by total area size (smallest - biggest, and vice-versa) via a button.
- List can be sorted by a region displayed in a select options.
- List can be sorted by a countries which are smaller than a written country via input.
