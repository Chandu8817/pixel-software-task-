import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { TextareaAutosize } from '@mui/material';
import { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import { AddNewPost } from '../../Function-Utils/contract-methods';
import { sendFileToIPFS, PostMetadataToIPFS } from "../../Function-Utils/ipfs-functions"
import { convertLength } from '@mui/material/styles/cssUtils';
import { useNavigate } from "react-router-dom";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';

import IconButton from '@mui/material/IconButton';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
const theme = createTheme();




function AddPost() {

    const [selected, setSelected] = useState(["shopping"]);
    const [newPost, setNewPost] = useState();

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const imgurl = await sendFileToIPFS(data.get('image'))
        console.log(imgurl, ">>>>>>>");

        const addData = {
            title: data.get('title'),
            description: data.get('description'),
            image: imgurl,
            tags: selected,

        };
        console.log(addData);
        const metaUrl =   await PostMetadataToIPFS(addData) //"QmbELQssS2oMaAZHgotaN88ctiPZSjNxqgHCR8aHY6UcJo"

       const res=  await AddNewPost(metaUrl);
       console.log(res)
       if(res.status){
        //  navigate("/")

        addData.user = res.events.newPost.returnValues.user
        addData.time = res.events.newPost.returnValues.dateTIme
        addData.status = res.status

        setNewPost(addData)
       
       }



    };



    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Add post
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="title"
                                    name="title"
                                    required
                                    fullWidth
                                    id="Title"
                                    label="Title"


                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField

                                    placeholder="Description"
                                    multiline
                                    rows={4}
                                    maxRows={6}
                                    name="description"
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                />
                            </Grid>

                            <Grid item xs={12}>


                                <input type="file"
                                    name="image"
                                    required
                                    fullWidth
                                    id="image"
                                    label="Image" />



                            </Grid>

                            <Grid item xs={12}>



                                {/* <pre>{JSON.stringify(selected)}</pre> */}

                                <TagsInput
                                    value={selected}
                                    onChange={setSelected}
                                    name="tags"
                                    placeHolder="enter tags"
                                />
                                <em>press enter to add new tag</em>

                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            AddPost
                        </Button>

                    </Box>
                </Box>
                { newPost?.status?  <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              R
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={newPost.title}
          subheader={newPost.time}
        />
        <CardMedia
          component="img"
          height="194"
          image={newPost.image}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
           {newPost.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
      
        </CardActions>
       
      </Card> :<></>}

            </Container>
        </ThemeProvider>
    );
}

export default AddPost;