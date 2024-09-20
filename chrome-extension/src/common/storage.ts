import { SyncStorage, User } from './models.ts';

export const getStoredUser = (): Promise<User> => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get(["user"], (items) => {
            if (chrome.runtime.lastError) {
                reject(chrome.runtime.lastError.message);
            } else {
                const res = items as Partial<SyncStorage>;
                if (res.user) {
                    resolve(res.user);
                } else {
                    reject('User data not found.')
                }
            }
        });
    });
};
