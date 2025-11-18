import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../firebase/config";

export async function getUserProfile(uid: string) {
    const refDoc = doc(db, 'users', uid);
    try {
        const snap = await getDoc(refDoc);
        if (!snap.exists()) {
            await setDoc(refDoc, {
                email: auth.currentUser?.email || "",
                name: "",
                lastName: "",
                phone: "",
                birthdate: "",
                gender: "",
                photoUrl: "",
            });
            return { email: auth.currentUser?.email || "", name: "", lastName: "", phone: "", birthdate: "", gender: "", photoUrl: "" };
        }
        return snap.data();
    } catch (e) {
        console.error("Error obteniendo el perfil:", e);
        return null;
    }

}

export async function saveUserProfile(uid: string, payload) {
    const refDoc = doc(db, 'users', uid);
    try {
        const filteredPayload = Object.fromEntries(
            Object.entries(payload).filter(([_, v]) => v !== undefined)
        );
        await setDoc(refDoc, {
            ...filteredPayload,
            updatedAt: serverTimestamp()
        }, { merge: true });
    } catch (e) {
        console.error("Error guardando perfil:", e);
    }
}

export async function uploadUserPhoto(uid: string, uri: string, filename = 'profile.jpg') {
    const fileRef = ref(storage, `user_profile_photos/${uid}/${filename}`);

    const blob = await new Promise<Blob>(async (resolve, reject) => {
        try {
            const response = await fetch(uri);
            const b = await response.blob();
            resolve(b);
        } catch (err) {
            reject(err);
        }
    });

    await uploadBytes(fileRef, blob);
    const url = await getDownloadURL(fileRef);
    return url;
}