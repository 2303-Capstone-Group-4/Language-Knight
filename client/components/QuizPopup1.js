import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useDispatch, useSelector } from 'react-redux';
import { setTier1Comp } from '../store';

const QuizPopup1 = () => {
  const [open, setOpen] = React.useState(true);
  const [answers, setAnswers] = React.useState({
    question1: '',
    question2: '',
    question3: '',
  });
  const [submitted, setSubmitted] = React.useState(false);
  const handleClose = () => setOpen(false);
  const { info1 } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (
      answers.question1 !== '' &&
      answers.question2 !== '' &&
      answers.question3 !== ''
    ) {
      if (info1.Quiz?.Answers) {
        if (
          answers.question1 === info1.Quiz.Answers[0] &&
          answers.question2 === info1.Quiz.Answers[1] &&
          answers.question3 === info1.Quiz.Answers[2]
        ) {
          alert('Correct, you may now proceed!');
          handleClose();
          dispatch(setTier1Comp(true));
        } else {
          alert('Incorrect, you must try again!');
        }
      } else if (info1.Quiz?.Question1) {
        if (info1.Quiz.Question1.Answer) {
          if (
            answers.question1 === info1.Quiz.Question1.Answer &&
            answers.question2 === info1.Quiz.Question2.Answer &&
            answers.question3 === info1.Quiz.Question3.Answer
          ) {
            alert('Correct, you may now proceed!');
            handleClose();
            dispatch(setTier1Comp(true));
          } else {
            alert('Incorrect, you must try again!');
          }
        } else if (info1.Quiz?.Answer1) {
          if (
            answers.question1 === info1.Quiz.Answer1 &&
            answers.question2 === info1.Quiz.Answer2 &&
            answers.question3 === info1.Quiz.Answer3
          ) {
            alert('Correct, you may now proceed!');
            handleClose();
            dispatch(setTier1Comp(true));
          } else {
            alert('Incorrect, you must try again!');
          }
        }
      } else if (info1.Quiz?.Questions[0].Answer) {
        if (
          answers.question1 === info1.Quiz.Questions[0].Answer &&
          answers.question2 === info1.Quiz.Questions[1].Answer &&
          answers.question3 === info1.Quiz.Questions[2].Answer
        ) {
          alert('Correct, you may now proceed!');
          handleClose();
          dispatch(setTier1Comp(true));
        } else {
          alert('Incorrect, you must try again!');
        }
      }
    }
  }, [submitted]);

  const updateAnswers = (ev) => {
    if (ev.target.name === ':r0:' || parseInt(ev.target.name[2]) % 3 === 0) {
      setAnswers({ ...answers, question1: ev.target.value });
    } else if (
      ev.target.name === ':r1:' ||
      (parseInt(ev.target.name[2]) - 1) % 3 === 0
    ) {
      setAnswers({ ...answers, question2: ev.target.value });
    } else if (
      ev.target.name === ':r2:' ||
      (parseInt(ev.target.name[2]) - 2) % 3 === 0
    ) {
      setAnswers({ ...answers, question3: ev.target.value });
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Fade
          in={open}
          timeout={500}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: 'auto',
              flexWrap: 'no-wrap',
              mt: 10,
              width: 500,
              height: 'auto',
              maxHeight: '80%',
              bgcolor: 'background.paper',
              zIndex: 'modal',
              fontSize: '1rem',
              fontWeight: '500',
              border: '2px solid #000',
              boxShadow: 24,
              borderRadius: '15px',
              p: 4,
              overflowY: 'scroll',
              '&::-webkit-scrollbar': {
                height: '80%',
              },
            }}
          >
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                if (submitted) {
                  setSubmitted(false);
                } else setSubmitted(true);
              }}
            >
              <FormControl>
                <div>
                  <div id="info-title">
                    Tier 1 Quiz <hr id="bold-hr"></hr>
                  </div>
                  {info1?.Quiz?.Questions ? (
                    <div>
                      {info1.Quiz.Questions.map((question, index) => {
                        return (
                          <div key={index}>
                            <hr id="body-hr"></hr>
                            <FormLabel>
                              {question.Question ? question.Question : question}
                            </FormLabel>
                            <RadioGroup name={`:r${index}:`}>
                              {info1.Quiz.Options
                                ? info1.Quiz.Options[index]
                                  ? info1.Quiz.Options[index].map((option) => {
                                      return (
                                        <FormControlLabel
                                          value={option}
                                          control={
                                            <Radio
                                              onClick={(ev) =>
                                                updateAnswers(ev)
                                              }
                                            />
                                          }
                                          label={option}
                                          key={option}
                                        />
                                      );
                                    })
                                  : info1.Quiz.Options.map((option) => {
                                      return (
                                        <FormControlLabel
                                          value={option}
                                          control={
                                            <Radio
                                              onClick={(ev) =>
                                                updateAnswers(ev)
                                              }
                                            />
                                          }
                                          label={option}
                                          key={option}
                                        />
                                      );
                                    })
                                : question.Options.map((option) => {
                                    return (
                                      <FormControlLabel
                                        value={option}
                                        control={
                                          <Radio
                                            onClick={(ev) => updateAnswers(ev)}
                                          />
                                        }
                                        label={option}
                                        key={option}
                                      />
                                    );
                                  })}
                            </RadioGroup>
                          </div>
                        );
                      })}
                      <div>
                        <hr id="body-hr"></hr>

                        <button type="submit">Submit</button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {info1?.Quiz?.Question1 ? (
                        <div>
                          <hr id="body-hr"></hr>

                          <FormLabel>
                            {info1.Quiz.Question1.Question
                              ? info1.Quiz.Question1.Question
                              : info1.Quiz.Question1}
                          </FormLabel>
                          <RadioGroup name=":r0:">
                            {info1.Quiz.Question1.Options
                              ? info1.Quiz.Question1.Options.map(
                                  (option, index2) => (
                                    <FormControlLabel
                                      value={option}
                                      control={
                                        <Radio
                                          onClick={(ev) => updateAnswers(ev)}
                                          label={index2}
                                        />
                                      }
                                      label={option}
                                      key={option}
                                    />
                                  )
                                )
                              : info1.Quiz.Options1.map((option, index2) => (
                                  <FormControlLabel
                                    value={option}
                                    control={
                                      <Radio
                                        onClick={(ev) => updateAnswers(ev)}
                                        label={index2}
                                      />
                                    }
                                    label={option}
                                    key={option}
                                  />
                                ))}
                          </RadioGroup>
                          <FormLabel>
                            {info1.Quiz.Question2.Question
                              ? info1.Quiz.Question2.Question
                              : info1.Quiz.Question2}
                          </FormLabel>
                          <RadioGroup name=":r1:">
                            {info1.Quiz.Question2.Options
                              ? info1.Quiz.Question2.Options.map(
                                  (option, index2) => (
                                    <FormControlLabel
                                      value={option}
                                      control={
                                        <Radio
                                          onClick={(ev) => updateAnswers(ev)}
                                          label={index2}
                                        />
                                      }
                                      label={option}
                                      key={option}
                                    />
                                  )
                                )
                              : info1.Quiz.Options2.map((option, index2) => (
                                  <FormControlLabel
                                    value={option}
                                    control={
                                      <Radio
                                        onClick={(ev) => updateAnswers(ev)}
                                        label={index2}
                                      />
                                    }
                                    label={option}
                                    key={option}
                                  />
                                ))}
                          </RadioGroup>
                          <FormLabel>
                            {info1.Quiz.Question3.Question
                              ? info1.Quiz.Question3.Question
                              : info1.Quiz.Question3}
                          </FormLabel>
                          <RadioGroup name=":r2:">
                            {info1.Quiz.Question3.Options
                              ? info1.Quiz.Question3.Options.map(
                                  (option, index2) => (
                                    <FormControlLabel
                                      value={option}
                                      control={
                                        <Radio
                                          onClick={(ev) => updateAnswers(ev)}
                                          label={index2}
                                        />
                                      }
                                      label={option}
                                      key={option}
                                    />
                                  )
                                )
                              : info1.Quiz.Options3.map((option, index2) => (
                                  <FormControlLabel
                                    value={option}
                                    control={
                                      <Radio
                                        onClick={(ev) => updateAnswers(ev)}
                                        label={index2}
                                      />
                                    }
                                    label={option}
                                    key={option}
                                  />
                                ))}
                          </RadioGroup>
                          <div>
                            <hr id="body-hr"></hr>
                            <button type="submit">Submit</button>
                          </div>
                        </div>
                      ) : (
                        <div>Loading...</div>
                      )}
                    </div>
                  )}
                </div>
              </FormControl>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default QuizPopup1;
