import { getCliClient } from 'sanity/cli'
const client = getCliClient({ apiVersion: '2024-01-01' })
async function main() {
  const data = await client.fetch(`*[_type == "clientType"] | order(order asc) {
    _id, "title": title.fr, "slug": slug, "link": link, "img": image.asset->url, order
  }`)
  console.log(JSON.stringify(data, null, 2))
}
main()
