
import React, { useEffect, useRef } from 'react';
import { Card, Icon, Image, Input, List, Label} from 'semantic-ui-react'
import axios from 'axios';
import {CHAT_API} from '../AppConfig';

// HANDLES INTERACTIONS WITH THE LLM (/backend)
const ChatForm = ({setSearchResults})=>{

    const chat = (query)=>{
        // AXIOS GET on the POKECHAT API POINT 
    }

    return (
    <div className='chat'>
        <Input fluid 
        icon={<Icon name='send' inverted circular link />}
        placeholder='Ask me a Pokemon Question...'
        />
        <Label pointing='above' message="strongest pokemon limit 1"> Strongest Pokemon </Label>
        <Label pointing='above' message="weakest pokemon limit 1"> Weakest Pokemon </Label>
        <Label pointing='above' message="starter pokemon limit 3"> Starter Pokemon </Label>
    </div>
    );
}

export {ChatForm};
