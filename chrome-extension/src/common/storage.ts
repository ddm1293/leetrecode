interface User {
    email: string
}

export const setUser = (user: User) => {
    return new Promise<void>((resolve, reject) => {
        chrome.storage.sync.set({ user }, () => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else {
                resolve();
            }
        })
    })
}

export const getUser = () => {
    return new Promise<User>((resolve, reject) => {
        chrome.storage.sync.get(["user"], (res) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else if (!res.user) {
                reject(new Error("User not found in storage."));
            } else {
                console.log("User retrieved from storage:", res.user);
                resolve(res.user);
            }
        })
    })
}
