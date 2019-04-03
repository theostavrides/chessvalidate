
1. Current player in check?
    Does move stop check?
      true -> move piece
      false -> return error

2. What is the piece? DONE
   does piece belong to current player? DONE

3. Is move legal?
    true -> move piece & update Game object (board, boardhistory, turn, etc.)
    false -> return error

4. Does move cause check?
    true -> does checkmate?
      true -> end game
      false ->
    false, nothing