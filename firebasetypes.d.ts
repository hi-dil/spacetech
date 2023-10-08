type FirebaseUser = {
  userId: string
  email: string,
  displayName: string,
  createDate: Date,
  lastAccessDate: Date,
  tags: string[],
  privacy: boolean,
  extdata: Object,
  imageURL: string,
  provider: string
  completeProfile: boolean
}

type ProjectType = {
  recId: string,
  userId: string,
  displayName: string,
  title: string,
  description: string,
  tags: string[],
  createDate: Date,
  lastUpdateDate: Date,
  extdata: Object
}
