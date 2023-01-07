export default function OnePage({ data }) {
    return <div style={{ fontSize: '25px' }} dangerouslySetInnerHTML={{ __html: data.content.join('<br>') }} />
}