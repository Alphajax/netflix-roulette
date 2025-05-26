import type { Meta, StoryObj } from '@storybook/react'
import { EditMovie } from './edit-movie.tsx'

const meta: Meta<typeof EditMovie> = {
  component: EditMovie,
}

export default meta
type Story = StoryObj<typeof EditMovie>

export const AddMovieComponent: Story = {
  args: {
    show: true,
    onSubmit: () => {
      console.log('onSubmit')
    },
    onClose: () => {
      console.log('onClose')
    },
    initialMovieInfo: {
      id: '444',
      imgURL:
        'https://avatars.mds.yandex.net/get-kinopoisk-image/1704946/ade65029-952f-488d-87b2-20c676970151/300x450',
      name: 'Терминатор 2: Судный день',
      genres: ['фантастика', 'боевик', 'триллер'],
      year: '1991',
      rating: '8.4',
      duration: '2ч 17м',
      description:
        'Прошло более десяти лет с тех пор, как киборг из 2029 года пытался уничтожить Сару Коннор — женщину, чей будущий сын выиграет войну человечества против машин.\n' +
        '\n' +
        'Теперь у Сары родился сын Джон и время, когда он поведёт за собой выживших людей на борьбу с машинами, неумолимо приближается. Именно в этот момент из постапокалиптического будущего прибывает новый терминатор — практически неуязвимая модель T-1000, способная принимать любое обличье. Цель нового терминатора уже не Сара, а уничтожение молодого Джона Коннора.\n' +
        '\n' +
        'Однако шансы Джона на спасение существенно повышаются, когда на помощь приходит перепрограммированный сопротивлением терминатор предыдущего поколения. Оба киборга вступают в смертельный бой, от исхода которого зависит судьба человечества.',
    },
  },
  name: 'Edit Movie',
}
