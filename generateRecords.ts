async function run() {
  const bandNames = await fetch(`https://bandname.filiplundby.dk/api/v1/sentence/10`).then((res) =>
    res.json()
  )
  console.log(bandNames)
  return
}

run()
