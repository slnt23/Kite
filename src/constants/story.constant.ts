import full01 from '@/assets/front/story-gallery/fulls/01.jpg'
import full02 from '@/assets/front/story-gallery/fulls/02.jpg'
import full03 from '@/assets/front/story-gallery/fulls/03.jpg'
import full04 from '@/assets/front/story-gallery/fulls/04.jpg'
import full05 from '@/assets/front/story-gallery/fulls/05.jpg'
import full06 from '@/assets/front/story-gallery/fulls/06.jpg'
import full07 from '@/assets/front/story-gallery/fulls/07.jpg'
import full08 from '@/assets/front/story-gallery/fulls/08.jpg'
import full09 from '@/assets/front/story-gallery/fulls/09.jpg'
import full10 from '@/assets/front/story-gallery/fulls/10.jpg'
import full11 from '@/assets/front/story-gallery/fulls/11.jpg'
import full12 from '@/assets/front/story-gallery/fulls/12.jpg'
import thumb01 from '@/assets/front/story-gallery/thumbs/01.jpg'
import thumb02 from '@/assets/front/story-gallery/thumbs/02.jpg'
import thumb03 from '@/assets/front/story-gallery/thumbs/03.jpg'
import thumb04 from '@/assets/front/story-gallery/thumbs/04.jpg'
import thumb05 from '@/assets/front/story-gallery/thumbs/05.jpg'
import thumb06 from '@/assets/front/story-gallery/thumbs/06.jpg'
import thumb07 from '@/assets/front/story-gallery/thumbs/07.jpg'
import thumb08 from '@/assets/front/story-gallery/thumbs/08.jpg'
import thumb09 from '@/assets/front/story-gallery/thumbs/09.jpg'
import thumb10 from '@/assets/front/story-gallery/thumbs/10.jpg'
import thumb11 from '@/assets/front/story-gallery/thumbs/11.jpg'
import thumb12 from '@/assets/front/story-gallery/thumbs/12.jpg'

export interface StoryGalleryItem {
  title: string
  description: string
  image: string
  thumbnail: string
}

const defaultDescription =
  'Nunc blandit nisi ligula magna sodales lectus elementum non. Integer id venenatis velit.'

export const STORY_GALLERY_ITEMS: StoryGalleryItem[] = [
  { title: 'Magna Feugiat Lorem', description: defaultDescription, image: full01, thumbnail: thumb01 },
  { title: 'Nisl Adipiscing', description: defaultDescription, image: full02, thumbnail: thumb02 },
  { title: 'Tempus Aliquam Veroeros', description: defaultDescription, image: full03, thumbnail: thumb03 },
  { title: 'Aliquam Ipsum Sed Dolore', description: defaultDescription, image: full04, thumbnail: thumb04 },
  { title: 'Cursis Aliquam Nisl', description: defaultDescription, image: full05, thumbnail: thumb05 },
  { title: 'Sed Consequat Phasellus', description: defaultDescription, image: full06, thumbnail: thumb06 },
  { title: 'Mauris Id Tellus Arcu', description: defaultDescription, image: full07, thumbnail: thumb07 },
  { title: 'Nunc Vehicula Id Nulla', description: defaultDescription, image: full08, thumbnail: thumb08 },
  { title: 'Neque Et Faucibus Viverra', description: defaultDescription, image: full09, thumbnail: thumb09 },
  { title: 'Mattis Ante Fermentum', description: defaultDescription, image: full10, thumbnail: thumb10 },
  { title: 'Sed Ac Elementum Arcu', description: defaultDescription, image: full11, thumbnail: thumb11 },
  { title: 'Vehicula Id Nulla Dignissim', description: defaultDescription, image: full12, thumbnail: thumb12 },
]
