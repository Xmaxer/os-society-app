import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Formik} from "formik";
import toDate from "date-fns/toDate";
import {StyledButton, StyledIconButton, StyledTextField} from "../assets/styledComponents";
import {KeyboardDatePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import enGB from "date-fns/locale/en-GB";
import DateFnsUtils from "@date-io/date-fns";
import {ThemeProvider} from "@material-ui/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import useApi from "../hooks/useApi";
import {PLAYER_MUTATION} from "../assets/queries";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme} from "@material-ui/core";
import palette from "../assets/colours";
import useWindowSize from "../hooks/useWindowSize";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';

const useStyles = makeStyles(theme => ({
    thead: {
        '& th': {
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.light,
            '& .MuiTableSortLabel-active': {
                color: theme.palette.tertiary.main
            },
            borderColor: theme.palette.tertiary.main
        }
    },
    actionContainer: props => (
        props.width > 1400 ?
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 'auto',
                marginRight: 20
            } : {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                '& > button': {
                    marginLeft: 20
                }
            }),
    sortLabel: {
        '&:hover': {
            color: theme.palette.tertiary.main
        },
        '&:focus': {
            color: theme.palette.tertiary.main
        }
    },
    sortLabelActive: {
        color: theme.palette.tertiary.main + ' !important'
    },
    addNewHeader: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        padding: 10
    },
    option: {
        display: 'flex',
        alignItems: 'center'
    },
    optionText: {
        marginLeft: 5
    },
    image: {
        height: 15,
        width: 15
    },
    datePickerRoot: {
        width: 200,
        '&:after': {
            borderBottomColor: theme.palette.tertiary.main
        },
        '&:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '&:hover:not($disabled):before': {
            borderBottomColor: theme.palette.primary.light + " !important",
        },
        color: theme.palette.tertiary.main,
        '& label.Mui-focused': {
            color: theme.palette.tertiary.main
        },
        '& label': {
            color: theme.palette.secondary.light
        },
        '& svg': {
            color: theme.palette.secondary.light
        }
    },
    chip: {
        '&:hover': {
            backgroundColor: theme.palette.tertiary.main
        },
        marginLeft: 5,
        marginBottom: 5
    },
    formContainer: props => (

        props.width > 1400 ? {
            display: 'flex',
            backgroundColor: theme.palette.primary.main,
            padding: 10,
            width: '100%',
            minWidth: '1400px',
            '& > *': {
                marginTop: 0
            }
        } : {
            display: 'flex',
            backgroundColor: theme.palette.primary.main,
            padding: 10,
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            '& > *': {
                marginTop: 20
            }
        }),
    fieldContainer: props => (
        props.width > 1400 ?
            {
                display: 'flex',
                width: '100%',
                justifyContent: 'space-around',
                alignItems: 'flex-end',
            } : {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                '& > *': {
                    marginTop: 20
                }
            }),
    formUsernameField: {
        width: 200
    },
    formRankField: {
        width: 200,
        "& svg": {
            color: theme.palette.secondary.light
        }
    },
    formPrevNameField: {
        width: 300,
        "& svg": {
            color: theme.palette.secondary.light
        }
    },
    formCommentField: {
        width: 300
    },
    dialogContainer: {

        '& .MuiDialog-paper': {
            overflowX: 'hidden',
            backgroundColor: theme.palette.primary.main,
            textAlign: 'center',
            '&:first-child': {
                color: theme.palette.secondary.light
            }
        }
    }
}));

const options = [
    {img: null, label: "Unranked", id: 0},
    {img: '/images/friend_rank.png', label: "Friend", id: 1},
    {img: '/images/recruit_rank.png', label: "Recruit", id: 2},
    {img: '/images/corporal_rank.png', label: "Corporal", id: 3},
    {img: '/images/sergeant_rank.png', label: "Sergeant", id: 4},
    {img: '/images/lieutenant_rank.png', label: "Lieutenant", id: 5},
    {img: '/images/captain_rank.png', label: "Captain", id: 6},
    {img: '/images/general_rank.png', label: "General", id: 7},
    {img: '/images/owner_rank.png', label: "Owner", id: 8},
];


export const datePickerTheme = createMuiTheme({
    palette: {
        primary: {
            main: palette.secondary
        },
        secondary: {
            main: palette.primary
        },

        tertiary: {
            main: palette.tertiary
        },
    },
    disabled: {}
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

function NewPlayerBar({handleAddNewPlayer}) {

    const [edit, setEdit] = useState(false);
    const {handleCall} = useApi({query: PLAYER_MUTATION});
    const [width, height] = useWindowSize()

    const classes = useStyles({width});

    const handleNewPlayerClick = (event) => {
        setEdit(true)
    };

    const handleCancel = (event) => {
        setEdit(false)
    }

    const getOptionLabel = (option) => {
        return option.label
    };

    const renderOption = (option) => {
        return (
            <React.Fragment>
                {idToLabel(option.id)}
            </React.Fragment>
        )
    };

    const idToLabel = (id) => {
        const item = options.find((e) => e.id === id);
        return <div className={classes.option}>
            {item.img ? <img src={item.img} alt={""} className={classes.image}/> : null}
            <Typography className={classes.optionText}>{item.label}</Typography>
        </div>
    };


    const handleSuccess = (data) => {
        handleAddNewPlayer(data)
        setEdit(false)
    }

    const onEnter = (event, setFieldValue, currentValues) => {
        if (event.key === 'Enter') {
            const val = event.target.value;
            if (val.length > 0 && val.length <= 20 && currentValues.find(e => e.toLowerCase() === val.toLowerCase()) === undefined) {
                const newValue = [...currentValues, event.target.value];
                setFieldValue('previous_names', newValue);
            }
        }
    };

    return (
        edit ?
            <Formik initialValues={{
                username: '',
                join_date: toDate(Date.now()),
                rank: 0,
                previous_names: [],
                comment: ''
            }} onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                handleCall({
                    variables: {...values}, handleComplete: () => {
                        resetForm()
                        setSubmitting(false)
                    }, handleSuccess: handleSuccess
                });
            }}>
                {({values, handleChange, handleSubmit, isSubmitting, setFieldValue}) => (

                    width > 1400 ? <form className={classes.formContainer} onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit(event)
                        }}>
                            <div className={classes.fieldContainer}>
                                <StyledTextField name={"username"} autoFocus={true} inputProps={{maxLength: 12}}
                                                 onChange={handleChange} value={values.username} label={'username'}
                                                 className={classes.formUsernameField}/>
                                <MuiPickersUtilsProvider locale={enGB} utils={DateFnsUtils}>
                                    <ThemeProvider theme={datePickerTheme}>
                                        <KeyboardDatePicker
                                            InputProps={{classes: {root: classes.datePickerRoot}}}
                                            TextFieldComponent={StyledTextField} variant={'inline'}
                                            format={"dd/MM/yyyy"} name={'join_date'}
                                            label={"Player's Join Date"}
                                            value={values.join_date} onChange={(date) => {
                                            setFieldValue('join_date', toDate(date))
                                        }}
                                            maxDate={Date.now()}/>
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                                <Autocomplete renderInput={(params) => <StyledTextField
                                    className={classes.formRankField} {...params}
                                    label={"Rank"}/>}
                                              options={options}
                                              getOptionLabel={getOptionLabel}
                                              onChange={(event, option) => {
                                                  setFieldValue('rank', option.id)
                                              }}
                                              renderOption={renderOption}
                                              defaultValue={options.find((e) => e.id === 0)} name={'rank'}/>
                                <Autocomplete multiple={true}
                                              name={'previous_names'}
                                              renderInput={(params) => <StyledTextField
                                                  className={classes.formPrevNameField} {...params}
                                                  label={"Previous names"}
                                                  onKeyDown={(event) => {
                                                      onEnter(event, setFieldValue, values.previous_names)
                                                  }}/>}
                                              options={[]}
                                              getOptionLabel={(option) => {
                                                  return option
                                              }}
                                              onChange={(event, option) => {
                                                  setFieldValue('previous_names', option)
                                              }}
                                              value={values.previous_names}
                                              renderTags={(tagValue, getTagProps) =>
                                                  tagValue.map((option, index) => (
                                                      <Chip
                                                          label={option}
                                                          {...getTagProps({index})}
                                                          className={classes.chip}
                                                          key={option}
                                                      />
                                                  ))
                                              }
                                />
                                <StyledTextField name={"comment"}
                                                 multiline={true} inputProps={{maxLength: 200}}
                                                 onChange={handleChange} value={values.comment} label={'comment'}
                                                 className={classes.formCommentField}/>
                            </div>
                            <div className={classes.actionContainer}>
                                <Tooltip title={"Save"}>
                                    <StyledIconButton onClick={handleSubmit}>
                                        <SaveIcon/>
                                    </StyledIconButton>
                                </Tooltip>
                                <Tooltip title={"Cancel"}>
                                    <StyledIconButton onClick={handleCancel}>
                                        <CloseIcon/>
                                    </StyledIconButton>
                                </Tooltip>
                            </div>
                        </form> :
                        <Dialog fullScreen={true} open={width <= 1400 && edit} TransitionComponent={Transition}
                                className={classes.dialogContainer}>
                            <Typography variant={'h5'}>Add a new player</Typography>
                            <form className={classes.formContainer} onSubmit={(event) => {
                                event.preventDefault();
                                handleSubmit(event)
                            }}>
                                <div className={classes.fieldContainer}>
                                    <StyledTextField name={"username"} autoFocus={true} inputProps={{maxLength: 12}}
                                                     onChange={handleChange} value={values.username} label={'username'}
                                                     className={classes.formUsernameField}/>
                                    <MuiPickersUtilsProvider locale={enGB} utils={DateFnsUtils}>
                                        <ThemeProvider theme={datePickerTheme}>
                                            <KeyboardDatePicker
                                                InputProps={{classes: {root: classes.datePickerRoot}}}
                                                TextFieldComponent={StyledTextField} variant={'inline'}
                                                format={"dd/MM/yyyy"} name={'join_date'}
                                                label={"Player's Join Date"}
                                                value={values.join_date} onChange={(date) => {
                                                setFieldValue('join_date', toDate(date))
                                            }}
                                                maxDate={Date.now()}/>
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                    <Autocomplete renderInput={(params) => <StyledTextField
                                        className={classes.formRankField} {...params}
                                        label={"Rank"}/>}
                                                  options={options}
                                                  getOptionLabel={getOptionLabel}
                                                  onChange={(event, option) => {
                                                      setFieldValue('rank', option.id)
                                                  }}
                                                  renderOption={renderOption}
                                                  defaultValue={options.find((e) => e.id === 0)} name={'rank'}/>
                                    <Autocomplete multiple={true}
                                                  name={'previous_names'}
                                                  renderInput={(params) => <StyledTextField
                                                      className={classes.formPrevNameField} {...params}
                                                      label={"Previous names"}
                                                      onKeyDown={(event) => {
                                                          onEnter(event, setFieldValue, values.previous_names)
                                                      }}/>}
                                                  options={[]}
                                                  getOptionLabel={(option) => {
                                                      return option
                                                  }}
                                                  onChange={(event, option) => {
                                                      setFieldValue('previous_names', option)
                                                  }}
                                                  value={values.previous_names}
                                                  renderTags={(tagValue, getTagProps) =>
                                                      tagValue.map((option, index) => (
                                                          <Chip
                                                              label={option}
                                                              {...getTagProps({index})}
                                                              className={classes.chip}
                                                              key={option}
                                                          />
                                                      ))
                                                  }
                                    />
                                    <StyledTextField name={"comment"}
                                                     multiline={true} inputProps={{maxLength: 200}}
                                                     onChange={handleChange} value={values.comment} label={'comment'}
                                                     className={classes.formCommentField}/>
                                </div>
                                <div className={classes.actionContainer}>
                                    <StyledButton variant={'contained'}
                                                  onClick={handleSubmit}>Apply</StyledButton>
                                    <StyledButton variant={'contained'}
                                                  onClick={handleCancel}>Close</StyledButton>
                                </div>
                            </form>
                        </Dialog>
                )}
            </Formik>
            : <div className={classes.addNewHeader}>
                <StyledButton onClick={handleNewPlayerClick}>Click here to add a new player</StyledButton>
            </div>
    );
}

export default NewPlayerBar;
