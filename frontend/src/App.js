import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import example from './images/example.png'

function App() {

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const fetchData = async() =>{
    try {
      const resultado = await Axios.post('/api/puppet',{
        precio: price,
        descripcion: description,
      });
      setLoading(false);
      setSuccess(true);
      console.log('Publicacion realizada');
    } catch (error) {
      setLoading(false);
      console.log(`No se realizó la publicación`);
    }
    
  }

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Click!");
    fetchData();
  }

  useEffect(() => {
    if((!price.trim() || price <= 0) || !description.trim()){
      setButtonDisabled(true)
    }
    if((price.trim() && price > 0) && description.trim()){
      setButtonDisabled(false)
    }
  },[price, description]);

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <TextField
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            id="standard-number"
            label="Precio"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextareaAutosize aria-label="empty textarea" placeholder="Descripción" onChange={(e) => setDescription(e.target.value)} value={description}/>
        </div>
        <div>
          <Button type="submit" color="primary" variant="contained" endIcon={<Icon>send</Icon>} disabled={buttonDisabled || loading}>Publicar</Button>
        </div>
        {
          success && (<div><img src={example} alt="example"/></div>)
        }      
        {
          loading && (<div><CircularProgress /></div> )
        } 
      </form>
    </div>
  );
}

export default App;
