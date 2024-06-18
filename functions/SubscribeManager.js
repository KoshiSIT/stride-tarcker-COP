// context which type of subscriber is being used
class SubscribeManager {
  static stateSubscribers = {};
  static nativeApiSubscribers = {};
  static firebaseSubscribers = {};
  static subscribeFirebase(subscName, fn) {
    // add subscriber
    this.firebaseSubscribers[subscName] = fn;
  }
  static unsubscribeFirebase(subscName) {
    // filter out the subscriber
    try {
      const fn = this.firebaseSubscribers[subscName];
      fn();
    } finally {
      delete this.firebaseSubscribers[subscName];
    }
  }
  static broadcastFirebase() {
    // unsubscribe all subscribers
    Object.keys(this.firebaseSubscribers).forEach((subscName) => {
      this.unsubscribeFirebase(subscName);
    });
  }
  static subscribeApi(subscName, fn) {
    this.nativeApiSubscribers[subscName] = fn;
  }
  static unsubscribeApi(subscName) {
    try {
      const fn = this.nativeApiSubscribers[subscName];
      fn();
    } finally {
      delete this.nativeApiSubscribers[subscName];
    }
  }
  static broadcastApi() {
    Object.keys(this.nativeApiSubscribers).forEach((subscName) => {
      this.unsubscribeApi(subscName);
    });
  }
  static subscribeState(subScName, fn) {
    this.stateSubscribers[subScName] = fn;
  }
  static unsubscribeState(subScName) {
    try {
      const fn = this.stateSubscribers[subScName];
      fn();
    } finally {
      delete this.stateSubscribers[subScName];
    }
  }
  static broadcastState() {
    Object.keys(this.stateSubscribers).forEach((subScName) => {
      this.unsubscribeState(subScName);
    });
  }
  static broadcastAll() {
    this.broadcastState();
    this.broadcastApi();
    this.broadcastFirebase();
  }
}

export default SubscribeManager;
