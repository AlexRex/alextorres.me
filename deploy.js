import { publish } from 'gh-pages';

publish(
  'build',
  {
    branch: 'gh-pages',
    repo: 'https://github.com/alexrex/alextorres.me.git',
    dotfiles: true,
    user: {
      name: 'Alex Torres',
      email: 'aletormat@gmail.com'
    }
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Deploy Complete!');
    }
  }
);
