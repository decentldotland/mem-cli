import axios from "axios";
import { generateSourceCode } from "./gen-format.js";
import { TXS_BROADCASTER_URL } from "./constants.js";

export async function deployContract(object) {
  try {
    const data = JSON.stringify(object);

    const response = await axios({
      method: "post",
      url: TXS_BROADCASTER_URL,
      data: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    });

    return response?.data;
  } catch (error) {
    console.log(error);
    return;
  }
}
