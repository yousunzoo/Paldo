export default function moveToDetail(event, target, router) {
  event.preventDefault();
  const targetId = target.getAttribute("href");
  router.navigate(targetId);
}
