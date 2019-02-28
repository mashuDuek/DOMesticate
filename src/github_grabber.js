class GithubGrabber {
    constructor() {
        this.username = '';
        this.start();
    }

    start() {
        this.addInputListener();
        this.addSubmitListener();
    }

    addInputListener() {
        const $input = $domesticate('.github-input');
        $input.on('change', (e) => this.username = e.target.value);
    };

    addSubmitListener() {
        const $form = $domesticate('.github-form');
        $form.on('submit', this.grabRepos.bind(this));
    };

    grabRepos(e) {
        e.preventDefault();
        this.turnOnLoading();
        
        $domesticate('.repo-list').nodes[0].innerText = '';
        $domesticate('.commits-list').nodes[0].innerText = '';
        
        $domesticate.ajax({
            url: `https://api.github.com/users/${this.username}/repos?type=all`,
            error: (err) => { this.addErrors('.repo-list', JSON.parse(err).message) },
            success: (res) => {
                const response = JSON.parse(res);
                this.renderRepos(response);
            }
        });
    };

    renderRepos(repos) {
        const names = repos.map(repo => repo.name);
        names.forEach(name => {
            const repo = `<li class="repo-item" value=${name}>${name}</li>`;
            $domesticate('.repo-list').append(repo);
        });
        this.turnOffLoading();
        this.grabCommits();
    };

    grabCommits() {
        const repoList = $domesticate('.repo-list')

        repoList.on('click', (e) => {
            const repo = $domesticate(e.target).nodes[0].attributes.value['value'];
            
            this.turnOnLoading();
            $domesticate.ajax({
                url: `https://api.github.com/repos/${this.username}/${repo}/commits`,
                error: (err) => { this.addErrors('.commits-list', JSON.parse(err).message) },
                success: (res) => {
                    const response = JSON.parse(res);
                    this.renderCommits(response);
                }
            });
        });
    }

    months() { 
      return { 0: 'Jan', 1: 'Feb', 2: 'Mar', 3: 'Apr', 4: 'May', 5: 'Jun', 6: 'Jul', 7: 'Aug', 8: 'Sep', 9: 'Oct', 10: 'Nov', 11: 'Dec' };
    };

    renderCommits(res) {
        $domesticate('.commits-list').nodes[0].innerText = '';
        res.forEach(({ commit }) => {
            const message = commit.message;
            const email = commit.author.email;
            const date = new Date(commit.author.date);
            const formattedDate = `${this.months()[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
            const item = `
                <li class="commit-item">
                    <p>${formattedDate}</p>
                    <p>${email}</p>
                    <p>message: ${message}</p>
                </li>
            `;
            $domesticate('.commits-list').append(item);
        })
        this.turnOffLoading();
    }

    turnOnLoading() {
        $domesticate('.loading-wheel').removeClass('hidden');
    }
    
    turnOffLoading() {
        $domesticate('.loading-wheel').addClass('hidden');
    }

    addErrors(className, message) {
        $domesticate(className).nodes[0].innerText = message;
        this.turnOffLoading();
    }
}