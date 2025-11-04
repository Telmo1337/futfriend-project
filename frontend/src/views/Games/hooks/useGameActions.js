import API from "../../../api/axios";


export default function useGameActions(fetchGame, onClose) {


    //editar o jogo de futebol~
    const editGame = async (gameId , updates) => {
        try {
            const res = await API.put(`/games/${gameId}`, updates)
            await fetchGame();
            console.log("jogo atualizado");
            return res.data
        } catch (err) {
            console.error("erro ao editar", err)
            alert(err.response?.data?.error || "Erro ao editar jogo")
        }
    };
    



    //apagar jogo
    const deleteGame = async(gameId) => {

        try{
            await API.delete(`/games/${gameId}`);
            onClose?.() //fechar o modal
        }catch(err){
            console.error("erro ao apagar o jogo");
            alert(err.response?.data?.error || "erro ao apagar o jogo")
        }
    }



    //terminar o jogo
    const finalizeGame = async(gameId, stats) => {

        try{
            const res = await API.put(`/games/${gameId}`, {
                state: "finished",
                goalsA: stats.goalsA,
                goalsB: stats.goalsB,
            });
            await fetchGame();
            alert("jogo terminado");
            return res.data;
        } catch (err) {
            console.error("erro ao finalizar o jogo:", err)
            alert(err.response?.data?.error || "erro ao finalizar o jogo.")
        }
    }




    return {editGame, deleteGame, finalizeGame}



}