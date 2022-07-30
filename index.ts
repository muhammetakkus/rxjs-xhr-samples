import { ajax } from 'rxjs/ajax';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, map } from 'rxjs';

const githubUsers = `https://api.github.com/users?per_page=2`;

/***/
const users = ajax(githubUsers).pipe(map((value) => value.response));

const subscribe = users.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log('done-1'),
});

/***/
const direct_json = ajax.getJSON(githubUsers);
const subscribe2 = direct_json.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log('done-2'),
});

/***/
const users3 = ajax({
  url: githubUsers,
  method: 'GET',
  headers: {},
  body: {
    /*in case you need a body*/
  },
});

const subscribe3 = users3.subscribe({
  next: (res) => console.log(res.response),
  complete: () => console.log('done-3'),
  error: (err) => console.error(err),
});

/***/
const data$ = fromFetch('https://api.github.com/users?per_page=5').pipe(
  switchMap((response) => response.json())
);

data$.subscribe({
  next: (result) => console.log(result),
  complete: () => console.log('done-4'),
});
