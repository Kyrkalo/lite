

export class StateService {

    stateKey: string = 'state';

    public isLoggedIn(): boolean {
        let state: IState = JSON.parse(localStorage.getItem(this.stateKey) || '""') || { };
        return state.token !== undefined;
    }

    public Login(): boolean {
        let state: IState = { token: '1234567890' }
        localStorage.setItem(this.stateKey, JSON.stringify(state));
        return true;
    }

    public Logout(): boolean {
        localStorage.removeItem(this.stateKey);
        return true;
    }
}

export interface IState {
    token: string;
}