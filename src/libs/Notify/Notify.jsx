import { notification } from "antd";

export const notify =(type, message,description='') => {
    notification[type]({
        message,
        description
    })
}