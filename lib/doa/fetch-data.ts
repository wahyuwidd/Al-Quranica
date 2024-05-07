
export const listDoaById = async (id: string) => {
    const res = await fetch(`http:192.168.1.120:3000/api/doa/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const json = await res.json();
    return json;
}