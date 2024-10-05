import { Opener } from '@lib/ui/base/Opener'
import { Button } from '@lib/ui/buttons/Button'
import { CreateFormFooter } from '@lib/ui/form/components/CreateFormFooter'
import { getFormProps } from '@lib/ui/form/utils/getFormProps'
import { InfoIcon } from '@lib/ui/icons/InfoIcon'
import { Modal } from '@lib/ui/modal'
import { Text } from '@lib/ui/text'
import { getColor } from '@lib/ui/theme/getters'
import styled from 'styled-components'

const Content = styled.div`
  line-height: 1.5;

  h3 {
    font-weight: 700;
    font-size: 16px;
    color: ${getColor('contrast')};
    margin-bottom: 8px;

    &:not(:first-child) {
      margin-top: 24px;
    }
  }

  strong {
    font-weight: 700;
    font-size: 14px;
    color: ${getColor('contrast')};
  }

  ol,
  ul {
    padding-left: 16px;
  }

  li {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
`

export const FocusEducationPrompt = () => {
  return (
    <Opener
      renderOpener={({ onOpen }) => (
        <Button onClick={onOpen} kind="secondary">
          <Text centerVertically style={{ gap: 8 }}>
            <InfoIcon />
            What is a focus session?
          </Text>
        </Button>
      )}
      renderContent={({ onClose }) => (
        <Modal
          placement="top"
          title="Welcome to Focus with Increaser"
          onClose={onClose}
          width={520}
          as="form"
          subTitle="Ready to take control of your productivity? Let us guide you through
            how the Focus feature in Increaser can help you improve your
            concentration and get more done."
          {...getFormProps({ onSubmit: onClose, onClose })}
          footer={<CreateFormFooter submitText="Continue" />}
        >
          <Content>
            <h3>What is Focus?</h3>
            <Text>
              The Focus feature is designed to help you work deeply on your most
              important tasks without interruptions. By structuring your work
              sessions into focused blocks, you can build productive habits and
              make the most of your time. Here, you'll choose a task or project,
              set your focus duration, and get started!
            </Text>

            <h3 style={{ marginTop: '16px' }}>How It Works</h3>
            <ol>
              <li>
                <Text>
                  <strong>Choose a Project or Task</strong>: Select a project
                  and a specific task you want to work on. If you don't have a
                  project or task yet, you can easily create one.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Set Focus Duration</strong>: Each focus session can be
                  customized to suit your needs. We recommend 90-minute work
                  blocks, which align with our philosophy of maximizing focus
                  without burnout. You can also adjust the start time if you've
                  already begun working.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Start Working</strong>: Hit "Start," and the timer
                  begins. Stay focused on your task—Increaser will help you keep
                  track of the time.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Take Breaks</strong>: After your session, it's time to
                  take a well-deserved break. Increaser suggests the right break
                  times based on your work session to keep you fresh and avoid
                  fatigue.
                </Text>
              </li>
            </ol>

            <h3>Why Use Focus?</h3>
            <ul>
              <li>
                <Text>
                  <strong>Stay on Track</strong>: The Focus feature helps you
                  prioritize your work, providing an easy way to manage tasks
                  without getting overwhelmed.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Set Clear Goals</strong>: Visualize your progress with
                  goals and see how much you've worked on each project this
                  week.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Minimize Distractions</strong>: Use focus music or
                  ambient sounds to maintain an optimal working environment
                  while avoiding external distractions.
                </Text>
              </li>
            </ul>

            <h3>Tips to Get the Most Out of Focus</h3>
            <ul>
              <li>
                <Text>
                  <strong>Use Breaks Wisely</strong>: After each focus session,
                  make sure to take a 5-15 minute break to recharge.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Track Your Progress</strong>: You can monitor your
                  daily and weekly achievements, allowing you to celebrate
                  progress and make adjustments when needed.
                </Text>
              </li>
              <li>
                <Text>
                  <strong>Customize Your Sessions</strong>: Whether it's
                  changing the duration or the task, tailor each session to what
                  works best for you.
                </Text>
              </li>
            </ul>

            <h3>Ready to Boost Your Productivity?</h3>
            <Text>
              Start your first focus session now and experience the power of
              deep, uninterrupted work. Increaser is here to help you make every
              minute count!
            </Text>
          </Content>
        </Modal>
      )}
    />
  )
}
