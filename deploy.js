const ghpages = require('gh-pages');

ghpages.publish(
  '__sapper__/export',// <-- replace yourproject with your repo name
  {
    branch: 'gh-pages',
    repo: 'https://github.com/alexrex/alextorres.me.git',
    user: {
      name: 'Alex Torres',
      email: 'aletormat@gmail.com'
    }
  },
  () => {
    console.log('Deploy Complete!')
  }
)
