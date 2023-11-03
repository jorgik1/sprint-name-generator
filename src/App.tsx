import React, {useState, useEffect} from 'react'
import Result from './components/Result';
import {adjectives} from './words/adjectives'
import {nouns} from './words/nouns'
import {Grid, Button, Typography, TextField} from "@mui/material";

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
        const response = await fetch('https://api.openai.com/v1/completions',
            {
                headers: {
                    'Authorization': `Bearer ${openAIKey}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify({ prompt: 'Generate a sprint name using an adjective and a noun.' })
            }
        );

        const data = await response.json();
        if(data.choices && data.choices.length > 0) {
            setSprintName(data.choices[0].text.trim());
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
                <TextField label="OpenAI Key" value={openAIKey} onChange={updateOpenAIKey} />
            </Grid>
            <Grid item p={4}>
                <Button variant='contained' onClick={handleGenerate}>Generate</Button>
                <Button variant='contained' onClick={handleGenerateAI}>Generate with AI</Button>
            </Grid>
            <Grid item>
                <Typography variant="h4" align="center">
                    <Result text={sprintName}/>
                </Typography>
            </Grid>
        </Grid>
    );
}