import React, { useState, useRef } from "react";
import { Card, Icon, Image, Input, List, Label } from "semantic-ui-react";
import axios from "axios";
import { CHAT_API } from "../AppConfig";

const ChatForm = ({ setSearchResults }) => {
  const [activeQuery, setActiveQuery] = useState("");
  const inputRef = useRef(null);

  const handleLabelClick = (query) => {
    setActiveQuery(query);
    fetchResults(query);
  };

  const handleSendClick = () => {
    const query = inputRef.current.inputRef.current.value;
    setActiveQuery(query);
    fetchResults(query);
  };

  const fetchResults = async (query) => {
    try {
      const response = await axios.get(`${CHAT_API}/chat/query`, {
        params: { q: query },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="chat">
      <Input
        fluid
        ref={inputRef}
        icon={
          <Icon name="send" inverted circular link onClick={handleSendClick} />
        }
        placeholder="Ask me a Pokemon Question..."
      />
      <Label
        pointing="above"
        onClick={() => handleLabelClick("strongest pokemon limit 1")}
      >
        {" "}
        Strongest Pokemon{" "}
      </Label>
      <Label
        pointing="above"
        onClick={() => handleLabelClick("weakest pokemon limit 1")}
      >
        {" "}
        Weakest Pokemon{" "}
      </Label>
      <Label
        pointing="above"
        onClick={() => handleLabelClick("starter pokemon limit 3")}
      >
        {" "}
        Starter Pokemon{" "}
      </Label>
    </div>
  );
};

export { ChatForm };
