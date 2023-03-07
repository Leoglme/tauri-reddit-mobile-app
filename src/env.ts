export const SITE_NAME = 'Redditech'
import AccountCircleOutline from 'vue-material-design-icons/AccountCircleOutline.vue'
import LockOutline from 'vue-material-design-icons/LockOutline.vue'

export const visibilities = [
  {
    icon: AccountCircleOutline,
    value: 'Publique',
    description: 'Tout le monde peut consulter, publier et commenter dans cette communauté',
  },
  {
    icon: LockOutline,
    value: 'Privée',
    description: 'Seuls les utilisateurs approuvés peuvent consulter et soumettre à cette communauté',
  },
]
