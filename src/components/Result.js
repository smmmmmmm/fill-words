import React from 'react'
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Grid } from '@material-ui/core'
import { useLocation } from "react-router-dom"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {TwitterIcon, TwitterShareButton} from "react-share"

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
}));


function Result() {

    const location = useLocation();
    const difficulty = location.state.difficulty;
    const time = location.state.time.toFixed(2);
    const results = location.state.results;
    const problemNum = results.length;
    const correctNum = results.reduce((a, b) => a + b.isCorrect, 0);
    const correctRatio = (correctNum/problemNum * 100).toFixed(2)

    return (
    <>
        <div align="center">
            <h1>Result</h1>
            <h2> 難易度 : {difficulty} </h2>
            <h2> Time : {time} </h2>
            <h2> 正解率 : {`${correctNum} / ${problemNum} (${correctRatio}%)`}
            </h2>

            <TwitterShareButton
                title={
                    `都道府県穴埋め (${difficulty})
・time: ${time} 秒
・正答率: ${correctNum} / ${problemNum} (${correctRatio}%)`}
                url={"https://smmm.github.io/fill-words/"}
                // via="smmm4423"
                hashtags={["fill_words"]}
            >
                <TwitterIcon size={50} round />
            </TwitterShareButton> <br></br>
            <Grid container alignItems="center" justify="center">
                <Grid xs={1}>
                    <h3>
                    <Link to={`../play/?difficulty=${difficulty}`} > Retry </Link>
                    </h3>
                </Grid>
                <Grid xs={1}>
                    <h3>
                    <Link to={`../`} > Top </Link>
                    </h3>
                </Grid>
            </Grid>
        </div>
        <br></br>
        <Grid container alignItems="center" justify="center">
        <div align="center">
            <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="right">Answer</TableCell>
                    <TableCell align="right">Your Answer</TableCell>
                    <TableCell align="right">isCorrect</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {results.map((result) => (
                    <StyledTableRow
                    key={result.qword}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    color="error"
                    >
                    <TableCell component="th" scope="row">{result.qword}</TableCell>
                    <TableCell align="right">{result.answers.join(", ")}</TableCell>
                    <TableCell align="right">{result.inputAnswers.join(", ")}</TableCell>
                    <TableCell align="right">{result.isCorrect ? "o": "x"}</TableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
        </div>
        </Grid>
    </>
    )
}

export default Result
