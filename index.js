const res = await fetch('https://api.belo.app/public/price');
if (res.ok) {
  const data = await res.json();
  console.log(data);
}