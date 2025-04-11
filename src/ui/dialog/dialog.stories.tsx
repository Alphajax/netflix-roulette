import type { Meta, StoryObj } from '@storybook/react'
import { Dialog } from './dialog.tsx'
import styles from './styles.module.scss'
import { useArgs } from '@storybook/preview-api'

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Components/Dialog',
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Primary: Story = {
  args: {
    show: true,
    title: 'My Favourite dialog',
    children: (
      <p className={styles.text}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto, doloremque dolorum
        eveniet itaque nam placeat quae voluptates. Eveniet natus obcaecati quasi ratione recusandae
        repellat similique tempora! Adipisci libero mollitia quae.
      </p>
    ),
  },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [{ show }, updateArgs] = useArgs()

    const handleClose = () => {
      updateArgs({ show: false })
    }

    const handleOpen = () => {
      updateArgs({ show: true })
    }

    return (
      <>
        {!show && <button onClick={handleOpen}>Open Dialog</button>}
        <Dialog {...args} show={show} onClose={handleClose} />
      </>
    )
  },
}
