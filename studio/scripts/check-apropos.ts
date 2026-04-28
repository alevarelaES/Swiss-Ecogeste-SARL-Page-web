import { getCliClient } from 'sanity/cli'
const client = getCliClient({ apiVersion: '2024-01-01' })
async function main() {
  const doc = await client.fetch('*[_type == "aProposPage"]{ _id }')
  console.log(JSON.stringify(doc))
}
main()
