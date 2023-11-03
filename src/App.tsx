import React, {useState, useEffect} from 'react'
import Result from './components/Result';
import {adjectives} from './words/adjectives'
import {nouns} from './words/nouns'
import {Grid, Button, Typography, TextField} from "@mui/material";
import { OpenAI } from "openai";

export default function App() {

    const [adjectivesList, setAdjectivesList] = useState<string[]>([]);
    const [nounsList, setNounsList] = useState<string[]>([]);
    const [sprintName, setSprintName] = useState<string>("");
    const [openAIKey, setOpenAIKey] = useState<string>("");

    useEffect(() => {
        setAdjectivesList(adjectives);
        setNounsList(nouns);

        // Get the OpenAI key from local storage if it exists
        const storedKey = window.localStorage.getItem('openAIKey');
        if (storedKey !== null) {
            setOpenAIKey(storedKey);
        }
    }, [])

    // Update the OpenAI key in the state and local storage
    const updateOpenAIKey = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpenAIKey(event.target.value);
        window.localStorage.setItem('openAIKey', event.target.value);
    }

    const handleGenerate = () => {
        const selectedAdjIndex = Math.floor(Math.random() * adjectivesList.length)
        const selectedNounIndex = Math.floor(Math.random() * nounsList.length)

        setSprintName(`${adjectivesList[selectedAdjIndex]} ${nounsList[selectedNounIndex]}`)
    }

    const handleGenerateAI = async () => {
        const openai = new OpenAI({
            'apiKey': openAIKey,
            dangerouslyAllowBrowser: true
        })
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{"role": "system", "content": "You are a helpful assistant to generate a sprint names"},
                {"role": "user", "content": "Generate just one sprint name with nouns and ajective"}],
          });
          if (response && response.choices && response.choices.length > 0) {
            const choises = response.choices
            if (choises) {
                const sprintName = choises[0].message.content?.trim() || ''
                setSprintName(sprintName);

            }
         }   
    
    }    

    return (
        <Grid direction="column" justifyContent="center" alignItems="center" container spacing={0} style={{minHeight: '100vh'}}>
        <Grid item p={4}>
            <Typography variant="h4" align="center">
                Sprint Name Generator
            </Typography>
        </Grid>
        <Grid item p={4}>
            <TextField label="OpenAI Key" value={openAIKey} onChange={updateOpenAIKey} fullWidth />
        </Grid>
        <Grid container item p={2} justifyContent="space-between">
        <Grid item xs={12} sm={5}>
            <Button variant="contained" onClick={handleGenerate} fullWidth style={{margin: '10px'}}>Generate</Button>
        </Grid>
        <Grid item xs={12} sm={5}>
            <Button variant="contained" onClick={handleGenerateAI} fullWidth style={{margin: '10px'}}>Generate with AI</Button>
        </Grid>
        </Grid>
        <Grid item>
            <Typography variant="h4" align="center">
                <Result text={sprintName}/>
            </Typography>
        </Grid>
    </Grid>
    );
}