export default class UserInfo {

    constructor(infoName, infoJob) {
        this.infoName = infoName;
        this.infoJob = infoJob;

    }

    setUserInfo(name, info) {
        this.name = name;
        this.info = info;
    }

    updateUserInfo() {
        this.infoName.textContent = this.name;
        this.infoJob.textContent = this.info;
    }
}
