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
