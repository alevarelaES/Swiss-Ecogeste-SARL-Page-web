import { getCliClient } from 'sanity/cli'
const client = getCliClient({ apiVersion: '2024-01-01' })
async function main() {
  const partners = await client.fetch('*[_type == "partner"]{ _id, name, "logo": logo.asset->url, url, order }')
  console.log('PARTNERS:', JSON.stringify(partners, null, 2))
  const team = await client.fetch('*[_type == "teamMember"]{ _id, name, "photo": photo.asset->url, initials, order }')
  console.log('TEAM:', JSON.stringify(team, null, 2))
}
main()
