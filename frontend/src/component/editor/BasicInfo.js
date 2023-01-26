import React from 'react';
import { Grid, TextField, Button } from '@material-ui/core';

const BasicInfo = (props) => {
    const prop = props.props;
    return (
        <>
            <div className='modal' style={{ display: `${prop.idisplay}` }}>
                <span className='close' onClick={()=>{prop.setIdisplay("none")}} >&times;</span>
                <Grid container direction="column" spacing={4} alignItems="center">

                    <Grid item container direction='row' spacing={4}>
                        <Grid item >
                            <TextField
                                label="Name"
                                value={prop.basicInfo.name}
                                onChange={(event) => prop.setbasicInfo({ ...prop.basicInfo, name: event.target.value })}
                                variant="outlined"
                                placeholder='Your Full Name'
                            />
                        </Grid>
                        <Grid item >
                            <TextField
                                label="Job Title"
                                value={prop.basicInfo.title}
                                onChange={(event) => prop.setbasicInfo({ ...prop.basicInfo, title: event.target.value })}
                                variant="outlined"
                                placeholder='Your Job Title'
                            />
                        </Grid>
                    </Grid>
                    <Grid item container direction='row' spacing={4}>
                        <Grid item>
                            <TextField
                                label="Email"
                                value={prop.basicInfo.email}
                                onChange={(event) => prop.setbasicInfo({ ...prop.basicInfo, email: event.target.value })}
                                variant="outlined"
                                placeholder='example@gmail.com'
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                label="Mobile"
                                value={prop.basicInfo.mobile}
                                onChange={(event) => prop.setbasicInfo({ ...prop.basicInfo, mobile: event.target.value })}
                                variant="outlined"
                                placeholder='Your Mobile No.'
                            />
                        </Grid>

                    </Grid>
                    <Grid item container>
                        <TextField
                            label="Description"
                            multiline
                            rows={8}
                            style={{ width: "100%", marginBottom: "30px" }}
                            value={prop.basicInfo.description}
                            onChange={(event) => prop.setbasicInfo({ ...prop.basicInfo, description: event.target.value })}
                            variant="outlined"
                            placeholder='Your brief description'
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => { prop.setIdisplay("none") }}
                        >
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

export default BasicInfo;