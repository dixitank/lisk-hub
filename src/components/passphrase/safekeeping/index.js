import React from 'react';
import ActionBar from '../../actionBar';
import styles from './safekeeping.css';
import SliderCheckbox from '../../toolbox/checkbox';
import TransitionWrapper from '../../toolbox/transitionWrapper';

class SafeKeeping extends React.Component {
  constructor() {
    super();
    this.state = {
      step: 'introduction-step',
    };
  }

  next(e) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (e.value === 'introduction-step' && e.checked) {
        this.setState({ step: 'revealing-step' });
      } else if (e.value === 'revealing-step' && e.checked) {
        this.setState({ step: 'revealed-step' });
      }
    }, 500);
  }

  done() {
    this.setState({ step: 'done-step' });
    setTimeout(() => {
      this.props.nextStep({ passphrase: this.props.passphrase });
    }, 400);
  }

  render() {
    const { t, passphrase, prevStep } = this.props;

    return (
      <section className={`${styles.safekeeping} ${styles[this.state.step]}`}>
        <header className={styles.table}>
          <div className={styles.tableCell}>
            <TransitionWrapper current={this.state.step} step='introduction-step'>
              <h2 className={styles.introduction}>
                Your passphrase is used to access your Lisk ID.
              </h2>
            </TransitionWrapper>
            <TransitionWrapper current={this.state.step} step='revealing-step,revealed-step'>
              <h2 className={styles.revealing}>Carefully write it down.</h2>
            </TransitionWrapper>
            <TransitionWrapper current={this.state.step} step='revealing-step,revealed-step'>
              <h5 className={styles.revealing}>Make sure to keep it safe.</h5>
            </TransitionWrapper>
          </div>
        </header>
        <section className={`${styles.introduction} ${styles.table}`}>
          <div className={styles.tableCell}>
            <TransitionWrapper current={this.state.step} step='introduction-step'>
              <h5>{t('I am responsible for keeping my passphrase safe. No one can restore it, not even Lisk.')}</h5>
            </TransitionWrapper>
            <TransitionWrapper current={this.state.step} step='introduction-step' animationName='fade'>
              <SliderCheckbox
                className={`${styles.smallSlider} i-understand-checkbox`}
                label={t('I understand')}
                icons={{
                  done: 'done',
                }}
                onChange={this.next.bind(this)}
                input={{
                  value: 'introduction-step',
                }}/>
            </TransitionWrapper>
          </div>
        </section>
        <section className={`${styles.revealing} ${styles.table}`}>
          <div className={styles.tableCell}>
            <TransitionWrapper current={this.state.step} step='revealing-step' animationName='fade'>
              <SliderCheckbox
                label={t('Drag to reveal')}
                icons={{
                  goal: 'lock',
                  done: 'vpn_key',
                }}
                hasSlidingArrows={true}
                onChange={this.next.bind(this)}
                className={`${styles.bigSlider} reveal-checkbox`}
                input={{
                  value: 'revealing-step',
                }}/>
            </TransitionWrapper>
            <textarea type='text' autoFocus={true}
              className={`${styles.input} passphrase`}
              defaultValue={passphrase}></textarea>
            <ActionBar
              className={styles.actionBar}
              secondaryButton={{
                label: t('Back'),
                className: styles.hidden,
                onClick: () => prevStep({ jump: 2 }),
              }}
              primaryButton={{
                label: t('Yes! It\'s safe'),
                className: 'next-button yes-its-safe-button',
                onClick: this.done.bind(this),
              }} />
          </div>
        </section>
      </section>);
  }
}


export default SafeKeeping;