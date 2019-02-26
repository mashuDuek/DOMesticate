class GithubGrabber {
    constructor() {
        this.username = '';
        this.start();
    }

    start = () => {
        const $github = $domesticate('.github');
        this.addInput($github);
        this.addInputListener();
        this.addSubmitListener();
    }

    addInput = ($el) => {
        const input = (`
            <form class="github-form">
                <input 
                    class="github-input"
                    type="text" 
                    placeholder="enter github username">
                </input>
                <button>Grab It!</button>
            </form>
        `);
        
        $el.append(input)
    };

    addInputListener = () => {
        const $input = $domesticate('.github-input');
        $input.on('change', (e) => this.username = e.target.value);
    };

    addSubmitListener = () => {
        const $form = $domesticate('.github-form');
        $form.on('submit', this.grabber);
    };

    grabber = (e) => {
        e.preventDefault();
        $domesticate.ajax({
            url: `https://cors-anywhere.herokuapp.com/api.github.com/users/${this.username}/repos`,
            error: (err) => {console.log(err)},
            success: (res) => {
                const response = JSON.parse(res);
                this.renderRepos(response);
            }
        });
    };

    renderRepos = (repos) => {
        const names = repos.map(repo => repo.name);
        names.forEach(name => {
            $domesticate('.github').append(`<p>${name}</p>`);
        });
    };
}