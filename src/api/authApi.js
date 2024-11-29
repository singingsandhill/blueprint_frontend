import api from "@/api";
// const BASE_URL = "/api/member";
const BASE_URL = "http://localhost:8080/api/member";
const headers = { "Content-Type": "multipart/form-data" };
export default {
    // username 중복 체크, true: 중복(사용불가), false: 사용 가능
    async checkUsername(username) {
        const { data } = await api.get(`${BASE_URL}/checkusername/${username}`);
        console.log("AUTH GET CHECKUSERNAME", data);
        return data;
    },
    
    async update(member) {
        const formData = new FormData();
        formData.append("username", member.username);
        formData.append("password", member.password);
        formData.append("email", member.email);
        if (member.avatar) {
            formData.append("avatar", member.avatar);
        }
        const { data } = await api.put(
            `${BASE_URL}/${member.username}`,
            formData,
            headers
        );
        console.log("AUTH PUT: ", data);
        return data;
    },
    async changePassword(formData) {
        const { data } = await api.put(
            `${BASE_URL}/${formData.username}/changepassword`,
            formData
        );
        console.log("AUTH PUT: ", data);
        return data;
    },
};