export const getRandomPosition = () => {
  return {
    x: Math.random() * (window.innerWidth - 200),
    y: Math.random() * (window.innerHeight - 200)
  }
}