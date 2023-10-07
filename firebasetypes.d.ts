type FirebaseUser = {
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
  userEmail: string,
  title: string,
  description: string,
  tags: string[],
  createDate: Date,
  lastUpdateDate: Date,
  extdata: Object
}
