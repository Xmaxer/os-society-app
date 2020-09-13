import React, {useState} from 'react';
import {makeStyles, ThemeProvider, useTheme} from '@material-ui/core/styles';
import {Formik, FormikHelpers} from "formik";
import toDate from "date-fns/toDate";
import {StyledButton, StyledIconButton, StyledTextField} from "../assets/theme/styledComponents";
import {DesktopDatePicker, LocalizationProvider} from "@material-ui/pickers";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import enGB from "date-fns/locale/en-GB";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Chip from "@material-ui/core/Chip";
import Tooltip from "@material-ui/core/Tooltip";
import SaveIcon from "@material-ui/icons/Save";
import CloseIcon from "@material-ui/icons/Close";
import useApi from "../hooks/useApi";
import {CREATE_PLAYER_MUTATION} from "../assets/api/queries";
import Typography from "@material-ui/core/Typography";
import {createMuiTheme, SlideProps, useMediaQuery} from "@material-ui/core";
import palette from "../assets/theme/colours";
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import {CreatePlayer, CreatePlayerVariables} from "../assets/api/apiInterfaces";

const useStyles = makeStyles(theme => ({
    thead: {
        '& th': {
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.light,
            '& .MuiTableSortLabel-active': {
                color: theme.palette.secondary.main
            },
            borderColor: theme.palette.secondary.main
        }
    },
    actionContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 20,
        [theme.breakpoints.down('md')]: {
            '& > button': {
                marginLeft: 20
            },
            marginRight: 0,
            marginLeft: 0,
        }
    },
    sortLabel: {
        '&:hover': {
            color: theme.palette.secondary.main
        },
        '&:focus': {
            color: theme.palette.secondary.main
        }
    },
    sortLabelActive: {
        color: theme.palette.secondary.main + ' !important'
    },
    addNewHeader: {
        textAlign: 'center',
        backgroundColor: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        padding: 10,
        borderTop: '2px solid ' + theme.palette.secondary.main
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
            borderBottomColor: theme.palette.secondary.main
        },
        '&:before': {
            borderBottomColor: theme.palette.secondary.light
        },
        '&:hover:not($disabled):before': {
            borderBottomColor: theme.palette.primary.light + " !important",
        },
        color: theme.palette.secondary.main,
        '& svg': {
            color: theme.palette.secondary.light
        }
    },
    chip: {
        '&:hover': {
            backgroundColor: theme.palette.secondary.main
        },
        marginLeft: 5,
        marginBottom: 5
    },
    formContainer: {
        display: 'flex',
        backgroundColor: theme.palette.primary.main,
        padding: 10,
        width: '100%',
        minWidth: '1400px',
        '& > *': {
            marginTop: 0
        },
        borderTop: '2px solid ' + theme.palette.secondary.main,
        [theme.breakpoints.down('md')]: {
            height: '100%',
            flexDirection: 'column',
            minWidth: 'inherit',
            '& > *': {
                marginTop: 20
            }
        }
    },
    fieldContainer: {
        display: 'flex',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            '& > *': {
                marginTop: 20
            },
            width: 'inherit',
        }
    },
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
    },
    datePickerTextField: {
        '& label.Mui-focused': {
            color: theme.palette.secondary.main
        },
        '& label': {
            color: theme.palette.secondary.light
        },
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
        primary: palette.primary,
        secondary: palette.secondary
    },
    //Leaving it here in case I ever need to do it
    // overrides: {
    //     // @ts-ignore
    //     MuiPickersPopper: {
    //         paper: {
    //             backgroundColor: palette.primary.main
    //         }
    //     }
    // }
    // disabled: {}
});

const Transition = React.forwardRef<unknown, SlideProps>((props, ref) => {
    return <Slide direction="up" ref={ref} {...props}/>;
});

export interface INewPlayerBarProps {
    handleAddNewPlayer: () => void
}

function NewPlayerBar({handleAddNewPlayer}: INewPlayerBarProps) {


    const [edit, setEdit] = useState(false);
    const {request} = useApi<CreatePlayer, CreatePlayerVariables>({query: CREATE_PLAYER_MUTATION});
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const classes = useStyles();

    const handleNewPlayerClick = () => {
        setEdit(true)
    };

    const handleCancel = () => {
        setEdit(false)
    }

    const getOptionLabel = (option: typeof options[0]) => {
        return option.label
    };

    const renderOption = (option: typeof options[0]) => {
        return (
            <React.Fragment>
                {idToLabel(option.id)}
            </React.Fragment>
        )
    };

    const idToLabel = (id: number) => {
        const item = options.find((e) => e.id === id);
        if (item) {
            return <div className={classes.option}>
                {item.img ? <img src={item.img} alt={""} className={classes.image}/> : null}
                <Typography className={classes.optionText}>{item.label}</Typography>
            </div>
        }
    };


    const handleSuccess = () => {
        handleAddNewPlayer()
        setEdit(false)
    }

    const onEnter = (event: React.KeyboardEvent<HTMLDivElement>, setFieldValue: FormikHelpers<any>['setFieldValue'], currentValues: Array<string>) => {
        if (event.key === 'Enter') {
            const val = (event.target as HTMLInputElement).value;
            if (val.length > 0 && val.length <= 20 && currentValues.find(e => e.toLowerCase() === val.toLowerCase()) === undefined) {
                const newValue = [...currentValues, val];
                setFieldValue('previousNames', newValue);
            }
        }
    };

    return (
        edit ?
            <Formik initialValues={{
                username: '',
                joinDate: toDate(Date.now()),
                rank: 0,
                previousNames: [] as Array<string>,
                comment: ''
            }} onSubmit={(values, {setSubmitting, resetForm}) => {
                setSubmitting(true);
                request({
                    variables: {...values}, handleComplete: () => {
                        resetForm()
                        setSubmitting(false)
                    }, handleSuccess: handleSuccess
                });
            }}>
                {({values, handleChange, handleSubmit, setFieldValue}) => (

                    !matches ? <form className={classes.formContainer} onSubmit={(event) => {
                            event.preventDefault();
                            handleSubmit(event)
                        }}>
                            <div className={classes.fieldContainer}>
                                <StyledTextField name={"username"} autoFocus={true} inputProps={{maxLength: 12}}
                                                 onChange={handleChange} value={values.username} label={'username'}
                                                 className={classes.formUsernameField}/>
                                <LocalizationProvider locale={enGB} dateAdapter={DateFnsAdapter as any}>
                                    <ThemeProvider theme={datePickerTheme}>
                                        <DesktopDatePicker
                                            InputProps={{classes: {root: classes.datePickerRoot}}}
                                            renderInput={(props) => <StyledTextField {...props} helperText={null}
                                                                                     className={classes.datePickerTextField}/>}
                                            label={"Player's Join Date"}
                                            value={values.joinDate} onChange={(date) => {
                                            setFieldValue('joinDate', date ? toDate(date) : null)
                                        }}
                                            maxDate={Date.now()}/>
                                    </ThemeProvider>
                                </LocalizationProvider>
                                <Autocomplete renderInput={(params) => <StyledTextField
                                    className={classes.formRankField} {...params}
                                    label={"Rank"}/>}
                                              options={options}
                                              getOptionLabel={getOptionLabel}
                                              onChange={(event, option) => {
                                                  setFieldValue('rank', option ? option.id : null)
                                              }}
                                              renderOption={renderOption}
                                              defaultValue={options.find((e) => e.id === 0)}/>
                                <Autocomplete multiple={true}
                                              renderInput={(params) => <StyledTextField
                                                  className={classes.formPrevNameField} {...params}
                                                  label={"Previous names"}
                                                  onKeyDown={(event) => {
                                                      onEnter(event, setFieldValue, values.previousNames)
                                                  }}/>}
                                              options={[] as Array<string>}
                                              getOptionLabel={(option: any) => {
                                                  return option
                                              }}
                                              onChange={(event, option) => {
                                                  setFieldValue('previousNames', option)
                                              }}
                                              value={values.previousNames}
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
                                    <StyledIconButton
                                        onClick={(event) => handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>)}>
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
                        <Dialog fullScreen={true} open={matches && edit} TransitionComponent={Transition}
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
                                    <LocalizationProvider locale={enGB} dateAdapter={DateFnsAdapter as any}>
                                        <ThemeProvider theme={datePickerTheme}>
                                            <DesktopDatePicker
                                                InputProps={{classes: {root: classes.datePickerRoot}}}
                                                renderInput={(props) => <StyledTextField {...props} helperText={null}/>}
                                                label={"Player's Join Date"}
                                                value={values.joinDate}
                                                onChange={(date) => {
                                                    setFieldValue('joinDate', date ? toDate(date) : null)
                                                }}
                                                maxDate={Date.now()}/>
                                        </ThemeProvider>
                                    </LocalizationProvider>
                                    <Autocomplete renderInput={(params) => <StyledTextField
                                        className={classes.formRankField} {...params}
                                        label={"Rank"}/>}
                                                  options={options}
                                                  getOptionLabel={getOptionLabel}
                                                  onChange={(event, option) => {
                                                      setFieldValue('rank', option ? option.id : null)
                                                  }}
                                                  renderOption={renderOption}
                                                  defaultValue={options.find((e) => e.id === 0)}/>
                                    <Autocomplete multiple={true}
                                                  renderInput={(params) => <StyledTextField
                                                      className={classes.formPrevNameField} {...params}
                                                      label={"Previous names"}
                                                      onKeyDown={(event) => {
                                                          onEnter(event, setFieldValue, values.previousNames)
                                                      }}/>}
                                                  options={[] as Array<string>}
                                                  getOptionLabel={(option) => {
                                                      return option
                                                  }}
                                                  onChange={(event, option) => {
                                                      setFieldValue('previousName', option)
                                                  }}
                                                  value={values.previousNames}
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
                                                  onClick={(event) => handleSubmit(event as unknown as React.FormEvent<HTMLFormElement>)}>Apply</StyledButton>
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
