import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import FormInput from "./FormInput";
import { nanoid } from "nanoid";
import gemini_icon from "/icons/gemini-icon.png";
import send_icon from "/icons/send_icon.png";
import user_icon from "/icons/user_icon.png";
import { useUserContext } from "./TasksLayout";

const AIChatBot = () => {
  const { user } = useUserContext();
  const [responseList, setResponseList] = useState([
    {
      id: nanoid(5),
      by: "bot",
      resp: `Hey ${user.user.firstName}, I'm your personal AI Assistant Chat Bot. Please feel free to ask your queries..`,
    },
  ]);
  const [searchText, setSerachText] = useState("");
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_API_KEY);

  const aiRun = async (message) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    const searchResponse = { id: nanoid(5), by: "bot", resp: text };
    responseList.push(searchResponse);
    setSerachText("");
  };

  const onClickSearchSend = () => {
    const searchRequest = { id: nanoid(5), by: "you", resp: searchText };
    responseList.push(searchRequest);
    aiRun(searchText);
  };

  const onChangeSearchInputField = (event) => {
    setSerachText(event.target.value);
  };

  return (
    <div className="container" style={{ paddingTop: "30px" }}>
      {responseList.length === 0 ? (
        <h4
          className="row d-flex justify-content-center align-items-center h-80"
          style={{ paddingBottom: "30px", fontFamily: "monospace" }}
        >
          Start the conversation
        </h4>
      ) : (
        responseList.map((details) => {
          return (
            <div key={details.id}>
              <div
                className="input-group mb-4"
                style={
                  details.by !== "bot"
                    ? { paddingRight: "15%" }
                    : { paddingLeft: "15%" }
                }
              >
                <span
                  className="input-group-text"
                  id="basic-addon1"
                  style={
                    details.by === "bot"
                      ? { background: "lightyellow", height: "40px" }
                      : { background: "azure", height: "40px" }
                  }
                >
                  <img
                    src={details.by === "bot" ? gemini_icon : user_icon}
                    alt="gemini_icon"
                    height="25"
                  />
                </span>
                <p className="form-control" key={details.id}>
                  {details.resp}
                </p>
              </div>
            </div>
          );
        })
      )}
      <div style={{ paddingBottom: "30px" }}>
        <div
          className="row"
          style={{
            paddingTop: "30px",
            background: "aliceblue",
            borderRadius: "20px",
          }}
        >
          <div className="col-md-12 mb-3">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <img src={gemini_icon} alt="gemini_icon" height="25" />
              </span>
              <FormInput
                type="text"
                name="search"
                value={searchText}
                onChange={onChangeSearchInputField}
                placeholder="search for queries..."
              />
              <span className="input-group-text">
                <button type="submit" className="btn">
                  <img
                    src={send_icon}
                    alt="gemini_icon"
                    height="25"
                    onClick={onClickSearchSend}
                  />
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatBot;
