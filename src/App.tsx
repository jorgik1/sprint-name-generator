import React, {useState, useEffect} from 'react'
import Result from './components/Result';
import {adjectives} from './words/adjectives'
import {nouns} from './words/nouns'
import {Grid, Button, Typography} from "@mui/material";

export default function App() {

    const [adjectivesList, setAdjectivesList] = useState<string[]>([]);
    const [nounsList, setNounsList] = useState<string[]>([]);
    const [sprintName, setSprintName] = useState<string>("");

    useEffect(() => {
        setAdjectivesList(adjectives);
        setNounsList(nouns);
    }, [])

    const handleGenerate = () => {
        const selectedAdjIndex = Math.floor(Math.random() * adjectivesList.length)
        const selectedNounIndex = Math.floor(Math.random() * nounsList.length)

        setSprintName(`${adjectivesList[selectedAdjIndex]} ${nounsList[selectedNounIndex]}`)
    }


    return (
        <Grid direction="column" justifyContent="center" alignItems="center" container spacing={0} style={{minHeight: '100vh'}}>
            <Grid item p={4}>
                <Typography variant="h4" align="center">
                    Sprint Name Generator
                </Typography>
            </Grid>
            <Grid item p={4}>
                <Button variant='contained' onClick={handleGenerate}>Generate</Button>
            </Grid>
            <Grid item>
                <Typography variant="h4" align="center">
                    <Result text={sprintName}/>
                </Typography>
            </Grid>
        </Grid>
    );
}
